const mockData = {
  addUserSuccess: {
    data: {
      status: 'success',
      message: 'User successfully added'
    }
  },
  addUserFailure: {
    data: {
      status: 'failed',
      message: 'User already exist'
    }
  },
  fetchMembers: {
    data: {
      allUser: [{ username: 'Ken' }, { username: 'Peter' }]
    }
  },
  fetchUsers: {
    payload: {
      pageCount: 9,
      pagenatedUsers: [{ id: 2, username: 'Samuel' },
      { id: 4, username: 'Ken' }, { id: 8, username: 'Jane' }]
    }
  },
  groupSuccess: {
    payload: {
      groupId: 67,
      groupName: 'Andela team 6',
      description: 'The winning team'
    }
  },
  groupFailure: {
    payload: {
      data: {
        message: 'Group exists already'
      }
    }
  },
  userGroups: {
    payload: {
      groups: [{
        groupId: 67,
        groupName: 'Andela team 6',
        description: 'The winning team'
      }]
    }
  },
  postMessage: {
    payload: {
      groupId: 90,
      message: 'I am coming',
      priority: 'Normal',
      createdAt: '2017-09-05T22:47:28.183Z',
      username: 'obinna'
    }
  },
  fetchPost: {
    payload: [{
      groupId: 90,
      message: 'I am coming',
      priority: 'Normal',
      createdAt: '2017-09-05T22:47:28.183Z',
      username: 'obinna'
    }]
  },
  signIn: {
    payload: {
      username: 'henry',
      userId: 42,
      email: 'henry@gmail.com',
      name: 'Henry',
      iat: 1504396668,
      exp: 1504483068
    }
  },
  signOut: {
    payload: {}
  },
  signUp: {
    payload: {
      username: 'henry',
      userId: 42,
      email: 'henry@gmail.com',
      name: 'Henry',
      iat: 1504396668,
      exp: 1504483068
    }
  },
  googleSignUp: {
    payload: {
      username: 'henry',
      userId: 42,
      email: 'henry@gmail.com',
      name: 'Henry',
      iat: 1504396668,
      exp: 1504483068
    }
  },
  signUpFailure: {
    payload: {
      message: 'Username already exist.'
    }
  },
  googleAuthFailure: {
    payload: {
      message: 'Oops, something went wrong. Username exist already'
    }
  },
  groupCreationFailure: {
    payload: {
      message: 'Group already exist'
    }
  }
};
export default mockData;
