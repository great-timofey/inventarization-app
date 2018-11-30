import React from 'react';
import { Text, View } from 'react-native';

import RateButton from 'components/RateButton';

type Props = {
  name: string,
  description: string,
  languageName: string,
  repoId: string,
};

function Item({ name, description, languageName, repoId }: Props) {
  return (
    <View
      style={{
        marginBottom: 5,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
      }}
    >
      <Text>
        {name} : {description} : {languageName}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <RateButton repoId={repoId} forAdding />
        <RateButton repoId={repoId} forAdding={false} />
      </View>
    </View>
  );
}

export default Item;
