import { globalStyles } from '@/styles/global-styles';
import React from 'react';
import { Text, TextProps } from 'react-native';


interface Props extends TextProps {
    variant?: 'h1' | 'h2';
}

export default function ThemeText({ children, variant = 'h1', ...rest }: Props) {
    return (

        <Text
            style={[
                { color: 'white', fontFamily: 'SpaceMono' },
                variant === 'h1' && globalStyles.mainResult,
                variant === 'h2' && globalStyles.subResult
            ]}
            adjustsFontSizeToFit
            numberOfLines={1}
            {...rest}
        >
            {children}
        </Text>

    )
}