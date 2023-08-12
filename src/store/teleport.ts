import { createEvent, createStore } from 'effector';

export interface TeleportParams {
  name: string;
  payload?: Record<string, unknown>;
}

const cleanedData = createEvent();
const teleportPopupStore = createStore<TeleportParams>({ name: '', payload: {} });
const openTeleportPopup = createEvent<TeleportParams>();

teleportPopupStore.on(openTeleportPopup, (_, payload) => payload).reset(cleanedData);

const teleportPopupApi = { cleanedData, teleportPopupStore, openTeleportPopup };

export { teleportPopupApi };
