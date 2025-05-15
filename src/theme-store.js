import { create } from "zustand";

export const useThemeStore = create((set) => ({
	font: "poppins",
	background: "plain",
	changeFont: (font) => set(() => ({ font: font })),
	changeBackground: (background) => set(() => ({ background: background })),
	changeColor: (color) => set(() => ({color: color}))
}));
