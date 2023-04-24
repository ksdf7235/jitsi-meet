import { atom } from "recoil";

export const DarkThemeState = atom({
    key: "DarkTheme",
    default: true,
});

export const LangState = atom({
    key: "language",
    default: "EN",
});
export const isShown = atom({
    key: "shown",
    default: false,
});
export const isVerify = atom({
    key: "verify",
    default: { email: false, password: false, wallet: false, discord: false },
});
export const CompleteVerify = atom({
    key: "compverify",
    default: false,
});
