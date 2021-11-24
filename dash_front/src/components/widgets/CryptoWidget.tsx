import { WidgetParameter } from 'services/widget';

interface WidgetProps {
  id: string;
  serviceId: string;
  parameters: WidgetParameter[];
  refreshRate: number;
}

const CryptoWidget = ({ ...props }: WidgetProps) => {
  return <></>;
};

export default CryptoWidget;
