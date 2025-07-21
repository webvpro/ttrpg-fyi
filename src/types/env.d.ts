/// <reference types="astro/client" />

// Extend Astro's Locals interface
declare namespace App {
  interface Locals {
    user?: {
      $id: string;
      name: string;
      email: string;
      // Add other user properties from Appwrite
      [key: string]: any;
    };
  }
}

interface ImportMeta {
  readonly env: {
    readonly PUBLIC_APPWRITE_ENDPOINT: string;
    readonly PUBLIC_APPWRITE_PROJECT_ID: string;
    readonly APPWRITE_KEY: string;
    [key: string]: string | boolean | undefined;
  };
}
