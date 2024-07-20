import React from 'react';
import {
  Layout,
  TopNavigation,
  Divider,
  TopNavigationAction,
} from '@ui-kitten/components';
import {StyleProp, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {MyIcon} from '../components/ui/MyIcon';

interface Props {
  title: string;
  subtitle?: string;
  style?: StyleProp<ViewStyle>;
  rightAction?: () => void;
  rightActionIcon?: string;
  children?: React.ReactNode;
}

export const MainLayout = ({
  children,
  title,
  subtitle,
  rightAction,
  rightActionIcon,
  style,
}: Props) => {
  const {top} = useSafeAreaInsets();
  const {canGoBack, goBack} = useNavigation();

  const renderBackAction = () => (
    <TopNavigationAction
      icon={<MyIcon name="arrow-back-outline" />}
      onPress={goBack}
    />
  );

  const RenderRightAction = () => {
    if (!rightActionIcon || !rightAction) return null;

    return (
      <TopNavigationAction
        icon={<MyIcon name={rightActionIcon} />}
        onPress={rightAction}
      />
    );
  };

  return (
    <>
      <TopNavigation
        title={title}
        subtitle={subtitle}
        alignment="center"
        accessoryLeft={canGoBack() ? renderBackAction : undefined}
        accessoryRight={() => <RenderRightAction />}
      />
      <Divider />
    </>
  );
};
