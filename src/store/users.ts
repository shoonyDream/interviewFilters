import { createEffect, createStore } from "effector";
import type { UserInfo } from '@/types/users';

const usersStore = createStore<UserInfo[]>([]);

const getUsersFx = createEffect(async () => {
    const json: { result?: UserInfo[] } = await import('@/assets/test.json');

    return 'result' in json ? json.result : []
})

usersStore.on(getUsersFx.doneData, (_, payload) => {
  return payload;
});

export const usersApi = {
    usersStore,
    getUsersFx
}