import { useSelector } from "react-redux";
import { selectorRobot } from "../../../store/reducers/robot";

export const Initial = () => {
  const { santaHat } = useSelector(selectorRobot);

  // Verifica se está no período natalino (novembro e dezembro até dia 25)
  const isChristmasSeason = () => {
    const today = new Date();
    const month = today.getMonth();
    const day = today.getDate();
    // Novembro (10) inteiro ou Dezembro (11) até dia 25
    return month === 10 || (month === 11 && day <= 25);
  };

  const showHat = santaHat && isChristmasSeason();

  return (
    <g>
      <ellipse id="head" ry="15%" rx="15%" cy="17%" cx="54%"></ellipse>
      {showHat && (
        <image href="/assets/images/natal.png" x="200" y="-100" width="190" />
      )}
    </g>
  );
};
