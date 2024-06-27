export function updateShowIcon(firId, value) {
  const storedState = localStorage.getItem("showIcon");
  const showIcon = storedState ? JSON.parse(storedState) : {};
  showIcon[firId] = value;
  localStorage.setItem("showIcon", JSON.stringify(showIcon));
}

export const clearShowIcon = () => {
    localStorage.removeItem('showIcon');
  };