export interface INotificationProps<TPayload> {
  type: string;
  userId: number;
  active: boolean;
  payload: TPayload;
}

export interface IThreadMessageNotificationProps {}

export interface IThreadMessageNotification {
  threadId: number;
  authorName: string;
  authorThumbnail: string;
  threadSlug: string;
  threadTitle: string;
}
