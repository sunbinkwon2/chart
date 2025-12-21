// src/types/vuetify.d.ts
import 'vue';

declare module 'vue' {
  export interface GlobalComponents {
    [key: string]: any;
  }
}