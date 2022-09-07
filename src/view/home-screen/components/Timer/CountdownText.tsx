import React from 'react';
import { Text } from 'react-native-svg';
import { theme } from '@/view/theme';

type CountDownTextProps = {
  radius: number;
  timeString: string;
};

function CountDownText({ radius, timeString }: CountDownTextProps) {
  return (
    <>
      <Text
        stroke={theme.colors.light}
        fill={theme.colors.light}
        x={radius}
        y={radius + 20}
        textAnchor="middle"
        fontSize={72}
        fontWeight="bold"
      >
        {timeString}
      </Text>
      <Text
        stroke={theme.colors.light}
        fill={theme.colors.light}
        x={radius}
        y={radius + 60}
        textAnchor="middle"
        fontSize={24}
        fontWeight={100}
      >
        Until Void
      </Text>
    </>
  );
}

export { CountDownText };
