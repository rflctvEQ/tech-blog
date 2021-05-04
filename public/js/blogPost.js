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
      document.location.replace('/profile');
    } else {
      alert('Failed to create blog post');
    }
  }

  // take user back to homepage
  window.location.href = "/profile";
};

const getUpdateButtonHandler = async (event) => {
  event.preventDefault();

  const btn = document.getElementsByClassName('update-btn')[0];
  const id = btn.getAttribute('data-id');

  console.log(btn);
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

  // document.location.replace(`/edit/${id}`)
  console.log('clicked update button!')
};

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

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
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
if (document.querySelector('.new-project-form')) {
  document.querySelector('.new-project-form').addEventListener('submit', newFormHandler);
}

if (document.querySelector('.project-list')) {
  document.querySelector('.update-btn').addEventListener('click', getUpdateButtonHandler);
  document.querySelector('.delete-btn').addEventListener('click', delButtonHandler);
}

if (document.querySelector('.submit-update-btn')) {
  document.querySelector('.submit-update-btn').addEventListener('click', updateButtonHandler);
};