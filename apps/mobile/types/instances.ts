export type InstanceState =
  | "pending"
  | "running"
  | "stopping"
  | "stopped"
  | "shutting-down"
  | "terminated";

export interface InstanceSummary {
  id: string;
  name: string;
  state: InstanceState;
  type: string;
}
