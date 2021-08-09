const confirmLogout = () => {
  Swal.fire({
    title: '<span>Are you sure you want to logout?</span>',
    confirmButtonText: 'Yes',
    showCancelButton: true,
    cancelButtonColor: '#f00022',
    background: 'rgb(45, 45, 45)'
  }).then(res => {
    if (res.isConfirmed) {
      logout();
    } else if (res.isDenied) {
      return;
    }
  })
}

const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    Swal.fire({
      icon: 'success',
      iconColor: '#b8daff',
      title: '<span>Logged out successfully</span>',
      showConfirmButton: false,
      background: 'rgb(45, 45, 45)',
      timer: 1500
    })

    setTimeout(() => document.location.replace('/'), 1500);
    // document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

document.querySelector('#logout').addEventListener('click', confirmLogout);
