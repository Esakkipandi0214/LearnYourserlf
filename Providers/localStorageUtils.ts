// localStorageUtils.ts
export function getLocalStorageValue() {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("Learn_yourSelf_Lang");
      return data ? JSON.parse(data) : true; // Return true if no data is found
    }
    return true; // Return true if running outside the browser
  }
  