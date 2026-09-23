import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


//added the new commit 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
