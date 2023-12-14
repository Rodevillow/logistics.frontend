// @ts-ignore
import { createAction } from '@reduxjs/toolkit';

export const setAuthUser = createAction<{ user: any }>('auth/setAuthUser');