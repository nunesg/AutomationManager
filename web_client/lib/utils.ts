import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to convert any snake_case object/array to camelCase
export function keysToCamel(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map(v => keysToCamel(v));
    } else if (obj !== null && obj.constructor === Object) {
        return Object.keys(obj).reduce((result, key) => {
            const camelKey = key.replace(/([-_][a-z])/ig, ($1) => 
                $1.toUpperCase().replace('-', '').replace('_', '')
            );
            result[camelKey] = keysToCamel(obj[key]);
            return result;
        }, {} as any);
    }
    return obj;
};