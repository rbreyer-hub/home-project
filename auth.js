/* ── Google Auth + Firestore sync — Home Project ── */
(function () {
  'use strict';

  const auth = firebase.auth();
  const db   = firebase.firestore();
  let currentUser = null;

  const homeDataRef = (uid) =>
    db.collection('users').doc(uid).collection('homeProject').doc('main');

  /* ── Read-only share mode detection ── */
  const urlParams = new URLSearchParams(window.location.search);
  const sharedUid = urlParams.get('uid');

  if (sharedUid) {
    window.isReadOnly = true;
    document.addEventListener('DOMContentLoaded', () => {
      const banner = document.getElementById('readOnlyBanner');
      if (banner) banner.style.display = 'flex';
    });
    homeDataRef(sharedUid).get().then(snap => {
      if (snap.exists && window.applyCloudData) {
        window.applyCloudData(snap.data());
      }
    }).catch(e => console.warn('[HomeSync] Failed to load shared data:', e));
  }

  /* ── Auth UI ── */
  function updateAuthUI(user) {
    const signInBtn  = document.getElementById('authSignIn');
    const userChip   = document.getElementById('authUserChip');
    const avatar     = document.getElementById('authUserAvatar');
    const nameEl     = document.getElementById('authUserName');
    const shareBtn   = document.getElementById('shareBtn');
    if (!signInBtn || !userChip) return;
    if (user) {
      signInBtn.style.display = 'none';
      userChip.style.display  = 'flex';
      if (user.photoURL) { avatar.src = user.photoURL; avatar.style.display = ''; }
      else avatar.style.display = 'none';
      nameEl.textContent = user.displayName || user.email.split('@')[0];
      if (shareBtn) shareBtn.style.display = 'inline-flex';
    } else {
      signInBtn.style.display  = '';
      userChip.style.display   = 'none';
      if (shareBtn) shareBtn.style.display = 'none';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('authSignIn')?.addEventListener('click', () => {
      auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .catch(e => alert('Sign-in failed: ' + e.message));
    });
    document.getElementById('authSignOut')?.addEventListener('click', () => {
      if (!confirm('Sign out? Your data is saved in the cloud.')) return;
      auth.signOut();
    });
    document.getElementById('shareBtn')?.addEventListener('click', () => {
      if (!currentUser) return;
      const url = `${location.origin}${location.pathname}?uid=${currentUser.uid}`;
      navigator.clipboard.writeText(url).then(() => {
        window.showToast('Share link copied! Anyone with this link can view your progress.');
      }).catch(() => {
        prompt('Copy this share link:', url);
      });
    });
  });

  /* ── Auth state ── */
  auth.onAuthStateChanged(async user => {
    currentUser = user;
    updateAuthUI(user);
    if (!user || sharedUid) return;

    try {
      const snap = await homeDataRef(user.uid).get();
      if (snap.exists && window.applyCloudData) {
        window.applyCloudData(snap.data());
      }
    } catch(e) { console.warn('[HomeSync] Pull failed:', e); }
  });

  /* ── Public API ── */
  window.cloudSync = {
    save(data) {
      if (!currentUser || window.isReadOnly) return;
      homeDataRef(currentUser.uid)
        .set({ ...data, updatedAt: firebase.firestore.FieldValue.serverTimestamp() })
        .catch(e => console.warn('[HomeSync] Save failed:', e));
    }
  };
})();
