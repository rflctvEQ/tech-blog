// creates new blog post 
newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#project-name').value.trim();
  const post = document.querySelector('#project-desc').value.trim();

  if (name && post) {
    const response = await fetch(`/api/blog`, {
      method: 'POST',
      body: JSON.stringify({ name, post }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      Swal.fire({
        icon: 'success',
        iconColor: '#b8daff',
        title: '<span>Posted!</span>',
        showConfirmButton: false,
        background: 'rgb(45, 45, 45)',
        timer: 1500
      })

      setTimeout(()=>document.location.replace('/profile'), 1500); 
    } else {
      alert('Failed to create blog post');
    }
  } else {
    Swal.fire({
      icon: 'error',
      title: '<span>Please include a title and blog content.</span>',
      background: 'rgb(45, 45, 45)'
    })
  }

  // take user back to homepage
  // window.location.href = "/profile";
};

// gets blog post user wants to edit 
const getUpdateButtonHandler = async (event) => {
  event.preventDefault();

  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    console.log(id);

    const response = await fetch(`/blog/edit/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace(`/blog/edit/${id}`);
    } else {
      alert(response.statusText);

    }
  }

  // document.location.replace(`/edit/${id}`)
  console.log('clicked update button!')
};

// saves/updates blog post with user's changes
const updateButtonHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#project-name').value.trim();
  const post = document.querySelector('#project-desc').value.trim();
  console.log('==================')
  console.log(name);
  console.log('==================')
  console.log(post);

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  const response = await fetch(`/api/blog/edited/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      id: id,
      name: name,
      post: post
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/profile/');
  } else {
    alert(response.statusText);
  }

  // window.location('/profile/');
}

// deletes blog post
const delButtonHandler = async (event) => {
  console.log(event);
  event.preventDefault();
  console.log('this is the event target!')
  console.log(event.target);

  if (event.target.hasAttribute('data-id')) {
    // console.log('this button has data-id!')
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blog/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete blog post');
    }
  }
  console.log('delete button clicked!')
};

const confirmDelete = (event) => {
  Swal.fire({
    title: '<span>Are you sure you want to delete this post? \n <p>This cannot be undone.</p></span>',
    confirmButtonText: 'Yes',
    showCancelButton: true,
    cancelButtonColor: '#f00022',
    background: 'rgb(45, 45, 45)'
  }).then(res => {
    if (res.isConfirmed) {
      delButtonHandler(event);
    } else if (res.isDenied) {
      return;
    }
  })
}

if (document.querySelector('.new-project-form')) {
  document.querySelector('.new-project-form').addEventListener('submit', newFormHandler);
}

if (document.querySelector('.project-list')) {
  document.querySelectorAll('.update-btn').forEach(btn => btn.addEventListener('click', getUpdateButtonHandler));
  document.querySelectorAll('.delete-btn').forEach(btn => btn.addEventListener('click', confirmDelete));
}

if (document.querySelector('.submit-update-btn')) {
  document.querySelector('.submit-update-btn').addEventListener('click', updateButtonHandler);
};