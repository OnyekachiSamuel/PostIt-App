const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbnJ5IiwidXNlcklkIjo0MiwiZW1haWwiOiJoZW5yeUBnbWFpbC5jb20iLCJuYW1lIjoiSGVucnkiLCJpYXQiOjE1MDQ3ODQ3NDYsImV4cCI6MTUwNDg3MTE0Nn0.Uad3SxnImwsXnjFI6ECTlSMt8Cpxamn0jD9NrlMxlW0';
export const mockData = {
  signIn: {
    state: {
      forgetPassword: [
        {
          message: 'Password successfully changed'
        }
      ]
    },
    props: {
      signInRequest: jest.fn(),
      googleAuthRequest: jest.fn(),
      forgetPasswordRequest: jest.fn()
    },
    event: {
      target: {
        name: 'name',
        value: 'Dan',
      }
    },
    target: {
      target: {
        name: 'username',
        value: 'Samuel'
      }
    }
  },
  signUp: {
    props: {
      signUpRequest: jest.fn(),
      googleAuthRequest: jest.fn(),
      signup: {
        errors: {
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        }
      }
    },
    event: {
      target: {
        name: 'name',
        value: 'Dan',
      }
    },
    target: {
      target: {
        name: 'username',
        value: 'Samuel'
      }
    },
    state: {
      signup: {
        errors: {
          password: 'Password field should not be empty'
        }
      }
    }
  },
  groupList: {
    props: {
      fetchGroupRequest: jest.fn(),
      fetchUserGroupRequest: jest.fn(),
      groups: [
        {
          groupId: 1,
          groupName: 'Andela Games'
        },
        {
          groupId: 2,
          groupName: 'Hack for Life'
        }
      ],
      signin: {
        user: {
          userId: 45
        }
      }
    },
    state: {
      groups: [
        {
          groupId: 1,
          groupName: 'Andela Games'
        },
        {
          groupId: 2,
          groupName: 'Hack for Life'
        }
      ],
      searchResult: {
        pageCount: 6,
        users: ['Samuel', 'Kachi', 'John']
      },
      groupMembers: ['Samuel']
    }
  },
  addUser: {
    props: {
      fetchUsersRequest: jest.fn(),
      addUserRequest: jest.fn(() => {
        return Promise.resolve({});
      }),
      fetchGroupUsers: jest.fn(),
      groupMembers: ['Samuel'],
      searchResult: {
        pageCount: 6,
        paginatedUsers: [
          {
            id: 2,
            username: 'Samuel'
          }
        ]
      },
      userIds: [9, 10],
      groups: [
        {
          groupId: 1,
          groupName: 'Andela Games'
        },
        {
          groupId: 2,
          groupName: 'Hack for Life'
        }
      ]
    },
    state: {
      groups: [
        {
          groupId: 1,
          groupName: 'Andela Games'
        },
        {
          groupId: 2,
          groupName: 'Hack for Life'
        }
      ],
      searchResult: {
        pageCount: 6,
        users: ['Samuel', 'Kachi', 'John']
      },
      groupMembers: ['Samuel']
    },
    event: {
      target: {
        name: 'groupId',
        value: '2',
      }
    },
    event2: {
      target: {
        name: 'usernames',
        value: 'Ben',
      }
    }
  },
  groupModal: {
    props: {
      createGroup: jest.fn(),
    },
    event: {
      target: {
        name: 'groupName',
        value: 'Andela Team 08',
      },
      preventDefault: jest.fn()
    }
  },
  postedMessage: {
    props: {
      messages: ['I am going now', 'I will be with you'],
      fetchPostRequest: jest.fn(),
      updateGroupInfo: jest.fn(),
      signin: {
        isAuthenticated: true,
        user: {
          userId: 7
        }
      },
      match: {
        params: {
          groupId: 9
        },
        groupName: 'Andela'
      }
    },
    initialState: {
      post: {
        message: 'Good one'
      }
    },
    state: {
      signin: {
        user: [{
          userId: 9,
          userName: 'Sam'
        }]
      },
      messages: [
        {
          content: 'I am here'
        }
      ]
    }
  },
  selectGroup: {
    state: {
      groups: [
        {
          groupId: 2,
          groupName: 'Amiala'
        },
        {
          groupId: 9,
          groupName: 'Viam'
        }
      ]
    },
    props: {
      fetchUserGroupRequest: jest.fn(),
      fetchGroupPostRequest: jest.fn(() => {
        return Promise.resolve({});
      }),
      viewPost: jest.fn(),
      groups: ['Andela 23', 'Andela 32'],
      groupPost: {
        data: ['Testing it out', 'Testing'],
      },
      signin: {
        user: {
          userId: 9
        }
      }
    },
    target: {
      target: {
        name: 'groupId',
        value: '23'
      }
    }
  },
  viewMembers: {
    state: {
      fetchMembers: [
        {
          username: 'Super Mike'
        },
        {
          username: 'Samuel'
        }
      ]

    },
    props: {
      fetchMembersRequest: jest.fn(),
      fetchMembers: [
        {
          username: 'Peter'
        }
      ],
      match: {
        params: {
          groupId: 8
        }
      }
    }
  },
  navBar: {
    props: {
      signOutRequest: jest.fn(),
      signOut: jest.fn(),
      signin: {
        user: [{ userId: 2, username: 'Henk' }]
      },
      show: jest.fn(),
      redirectUrl: '/'
    },
    state: {
      signin: {
        user: [{
          userId: 9,
          userName: 'Sam'
        }]
      }
    }
  },
  composeMessage: {
    props: {
      postRequest: jest.fn(),
      match: {
        params: {
          groupId: 9
        },
        groupName: 'Andela'
      }
    },
    target: {
      target: {
        name: 'priority',
        value: 'Urgent',
      }
    }
  },
  forgetPasswordPage: {
    props: {
      resetPasswordRequest: jest.fn(),
      match: {
        params: {
          token
        }
      },
      forgetPassword: {
        message: 'Successfully resetted your password'
      }
    },
    state: {
      forgetPassword: {
        message: 'Successfully resetted your password'
      }
    },
    target: {
      target: {
        name: 'password',
        value: 'admin',
      }
    }
  }
};
