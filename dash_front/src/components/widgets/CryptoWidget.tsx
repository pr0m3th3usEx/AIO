import { WidgetParameter } from 'services/widget';

interface WidgetProps {
  id: string;
  serviceId: string;
  parameters: WidgetParameter[];
  refreshRate: number;
}

const CryptoWidget = ({ ...props }: WidgetProps) => {
  // setInterval(async () => {

  // }, 1000);

  return <></>;
};

export default CryptoWidget;
