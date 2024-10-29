import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';

interface HoverableIconProps {
  icon : React.ReactNode;
  hoverColor ?: string;
  size ?: number;
  style ?: ViewStyle;
  color ?: string;
  onPress ?: () => void;
}

export const HoverableIcon: React.FC<HoverableIconProps> = ({ icon, color="black", hoverColor = "green", size = 24, style, onPress }) => {
  const [isPressed, setIsPressed] = React.useState(false);

  const iconStyle = {
    color: isPressed ? hoverColor : color,
    fontSize: size ?? (icon as any).props.style.fontSize,
  };

  return(
    <TouchableOpacity
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={style}
    >
      {React.cloneElement(icon as React.ReactElement, { style: iconStyle })}
    </TouchableOpacity>
  );
};
