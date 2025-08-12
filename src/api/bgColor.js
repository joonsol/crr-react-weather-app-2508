// weatherId: OpenWeather 코드 (예: 500, 801, 611, 800 등)
export const getColorByWeatherId = (weatherId) => {
  if (weatherId === 800) return '#FCD34D'; // 맑음: 따뜻한 노랑(amber-300)

  const group = Math.floor(weatherId / 100); // 2,3,5,6,7,8...

  switch (group) {
    case 2: return '#4F46E5'; // 2xx 뇌우: 인디고
    case 3: return '#7DD3FC'; // 3xx 이슬비: 밝은 하늘색
    case 5: return '#3B82F6'; // 5xx 비: 파란색
    case 6: return '#E5E7EB'; // 6xx 눈: 매우 옅은 회색(눈/얼음 느낌)
    case 7: return '#9CA3AF'; // 7xx 안개/먼지: 중간 회색
    case 8: return '#94A3B8'; // 80x 구름: 슬레이트 그레이
    default: return '#64748B'; // 예외: 기본 회색
  }
};
