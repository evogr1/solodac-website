let pendingSectionId: string | null = null;

export function setPendingSection(id: string) {
  pendingSectionId = id;
}

export function consumePendingSection(): string | null {
  const id = pendingSectionId;
  pendingSectionId = null;
  return id;
}
