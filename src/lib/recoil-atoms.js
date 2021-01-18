import { atom, selector } from 'recoil'
import { utils } from '../utils/utils'

export const accessToken = atom({
    key: 'accessToken',
    default: null,
})

export const refreshToken = atom({
    key: 'refreshToken',
    default: null,
})

// export const setAccessToken = selector({
//     key: 'setAccessToken',
//     set: ({ set }) => set(accessToken, (token)),
// })

// export const setRefreshToken = selector({
//     key: 'setRefreshToken',
//     set: ({ set }) => set(refreshToken, (token)),
// })

export const userInfo = atom({
    key: 'userInfo',
    default: utils.getUser() === undefined ? {} : JSON.parse(utils.getUser()),
})

// const getUserInfo = selector({
//     key: 'getUserInfo',
//     get: ({get}) => {
//       const filter = get(todoListFilterState);
//       const info = get(userInfo);
//         return info
//     },
//   });

// export const setUserInfo = selector({
//     key: 'setUserInfo',
//     set: ({ set }) => set(user, (userinfo)),
// })

export const delAccessToken = selector({
  key: 'delAccessToken',
  reset: ({ reset }) => reset(accessToken),
})

export const delRefreshToken = selector({
    key: 'delRefreshToken',
    reset: ({ reset }) => reset(refreshToken),
  })