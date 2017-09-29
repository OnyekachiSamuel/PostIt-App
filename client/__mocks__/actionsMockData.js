
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbnJ5IiwidXNlcklkIjo0MiwiZW1haWwiOiJoZW5yeUBnbWFpbC5jb20iLCJuYW1lIjoiSGVucnkiLCJpYXQiOjE1MDQ3ODQ3NDYsImV4cCI6MTUwNDg3MTE0Nn0.Uad3SxnImwsXnjFI6ECTlSMt8Cpxamn0jD9NrlMxlW0';
const actionsMockData = {
  addUserAction: {
    response: [
      {
        status: 200,
        data: {
          message: 'User successfully added'
        },
        response: {
          data: {
            message: 'Error occcured'
          }
        }
      },
      {
        status: 200,
        data: {
          message: 'User already exists'
        },
        response: {
          data: {
            message: 'User already exists'
          }
        }
      }
    ],
    payload: [
      'User already exists',
      {
        message: 'User successfully added'
      }
    ]
  },
  fetchMembers: {
    response: [
      {
        status: 200,
        data: {
          allUsers: [{ username: 'Ken' }, { username: 'Peter' }]
        }
      }
    ],
    payload: [
      {
        allUsers: [{ username: 'Ken' }, { username: 'Peter' }]
      }
    ]
  },
  fetchPost: {
    response: {
      status: 200,
      data: {
        posts: [{
          groupId: 90,
          message: 'I am coming',
          priority: 'Normal',
          createdAt: '2017-09-05T22:47:28.183Z',
          username: 'obinna'

        }]
      },
      message: 'Received'
    },
    payload: [{
      groupId: 90,
      message: 'I am coming',
      priority: 'Normal',
      createdAt: '2017-09-05T22:47:28.183Z',
      username: 'obinna'
    }]
  },
  fetchUsersGroup: {
    response: {
      status: 200,
      data: {
        data: [{ groupName: 'Teencode', decription: 'Building the future tech leads' },
        { groupName: 'Code for fun', description: 'Raising funds for charity' }]
      }
    },
    payload: {
      data: [{ groupName: 'Teencode', decription: 'Building the future tech leads' },
      { groupName: 'Code for fun', description: 'Raising funds for charity' }]
    }
  },
  fetchUsers: {
    response: {
      data: {
        searchMetaData: {
          limit: 5,
          total_count: 20
        },
        paginatedUsers: [
          { id: 34, username: 'Helen' },
          { id: 35, username: 'Adam' }
        ]
      }
    },
    payload: {
      pageCount: 4,
      paginatedUsers: [
        { id: 34, username: 'Helen' },
        { id: 35, username: 'Adam' }
      ]
    }
  },
  resetLinkSuccess: {
    response: {
      status: 200,
      data: {
        message: 'Check your email and use the link to reset your password'
      }
    },
    payload: 'Check your email and use the link to reset your password'
  },
  resetLinkFailure: {
    response: {
      status: 200,
      response: {
        data: {
          message: 'User not found'
        }
      }
    },
    payload: 'User not found'
  },
  passwordResetSuccess: {
    response: {
      status: 200,
      data: {
        message: 'You have successfully resetted your password.'
      }
    },
    payload: 'You have successfully resetted your password.'
  },
  passwordResetFailure: {
    response: {
      status: 200,
      response: {
        data: {
          message: 'Password mismatch. Type in a new password'
        }
      }
    },
    payload: 'Password mismatch. Type in a new password'
  },
  googleSignUp: {
    userData: {
      name: 'henry',
      username: 'henry',
      email: 'henry@gmail.com'
    },
    response: {
      status: 200,
      data: {
        token
      }
    },
    payload: {
      username: 'henry',
      userId: 42,
      email: 'henry@gmail.com',
      name: 'Henry',
      iat: 1504784746,
      exp: 1504871146
    }
  },
  googleFailure: {
    userData: {
      name: 'henry',
      username: 'henry',
      email: 'henry@gmail.com'
    },
    response: {
      status: 200,
      response: {
        data: {
          message: 'Oops, operation failed. Username exist already'
        }
      }
    },
    payload: 'Oops, operation failed. Username exist already'
  },
  createGroupSuccess: {
    groupData: {
      groupName: 'Andela team 6',
      description: 'The winning team'
    },
    response: {
      status: 200,
      data: {
        group: {
          groupId: 67,
          groupName: 'Andela team 6',
          description: 'The winning team'
        },
        message: 'Group successfully created'
      }
    },
    payload: {
      groupId: 67,
      groupName: 'Andela team 6',
      description: 'The winning team'
    }
  },
  createGroupFailure: {
    groupData: {
      groupName: 'Andela team 6',
      description: 'The winning team'
    },
    response: {
      status: 200,
      response: {
        data: {
          message: 'Group exist already'
        }
      }
    },
    errors: 'Group exist already'
  },
  fetchGroupUsers: {
    response: {
      status: 200,
      data: {
        groupMembers: ['John', 'Helen', 'Paul']
      }
    },
    payload: ['John', 'Helen', 'Paul']
  },
  postSuccess: {
    userData: {
      message: 'Good to go',
      priority: 'Normal'
    },
    response: {
      status: 200,
      data: {
        post: {
          groupId: 90,
          message: 'Good to go',
          priority: 'Normal',
          createdAt: '2017-09-05T22:47:28.183Z',
          username: 'obinna'

        }
      },
      message: 'Received'
    },
    payload: {
      groupId: 90,
      message: 'Good to go',
      priority: 'Normal',
      createdAt: '2017-09-05T22:47:28.183Z',
      username: 'obinna'
    }
  },
  postFailure: {
    userData: {
      message: '  ',
      priority: 'Normal'
    },
    response: {
      status: 200,
      response: {
        data: {
          errors: {
            message: 'Whitespace character is not allowed'
          }
        }
      }
    },
    payload: 'Whitespace character is not allowed'
  }
};
export default actionsMockData;
