import { useParams } from "react-router-dom";

export default function InstanceDetail() {
  const { instanceId } = useParams();
  return <div>Instance Detail: {instanceId}</div>;
}
