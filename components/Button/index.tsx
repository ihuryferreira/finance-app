import { ActivityIndicator, Pressable, Text } from 'react-native';
import { styles } from './styles';

type ButtonProps = {
  title: string,
  variant?: 'primary' | 'outlined' | 'danger',
  loading?: boolean,
  onPress?: () => void
}

export const Button: React.FC<ButtonProps> = ({ title, variant = 'primary', loading, onPress }) => {
  const variantColorMap = {
    primary: '#2C5F30',
    outlined: '#f5f5f5',
    danger: '#FF4136',
  };
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: variantColorMap[variant],
          borderColor: variant !== 'outlined' ? variantColorMap[variant] : variantColorMap.primary,
          borderWidth: 2,
          opacity: pressed ? 0.8 : 1,
          transform: [{ scale: pressed ? 0.97 : 1 }],
        },
      ]}
    >
      {
        (
          loading ? (
            <ActivityIndicator
              color={variant === 'outlined' ? variantColorMap.primary : '#fff'}
            />
          ) : (
            <Text style={[
              styles.buttonText,
              { color: variant === 'outlined' ? variantColorMap.primary : '#fff' }
            ]}
            >
              {title}
            </Text>
          )
        )
      }
    </Pressable>
  )
}