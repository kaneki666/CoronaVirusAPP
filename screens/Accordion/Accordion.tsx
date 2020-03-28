import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
const { height } = Dimensions.get('window');

import List, { List as ListModel } from './List';
import Listt, { Listt as ListModell } from './Listt';
import Listtt, { Listtt as ListModelll } from './Listtt';

const list: ListModel = {
  name: 'Open Symptom',
  items: [
    { name: 'Fever' },
    { name: 'Tiredness' },
    { name: 'Dry cough' },
    { name: 'Shortness of breath' },
    { name: 'Difficulty breathing (severe cases)' },
    { name: 'Aches and Pain' },
    { name: 'Sore Throat' },
    { name: 'and very few people will report diarrhoea, nausea or a runny nose' },
  ],
};

const lists: ListModell = {
  name: 'Open Prevention',
  items: [
    {
      name:
        'Wash your hands regularly for 20 seconds, with soap and water or alcohol-based hand rub',
    },
    {
      name:
        'Cover your nose and mouth with a disposable tissue or flexed elbow when you cough or sneeze',
    },
    { name: 'Avoid close contact (1 meter or 3 feet) with people who are unwell' },
    { name: 'Stay home and self-isolate from others in the household if you feel unwell' },
    {
      name:
        'Put distance between yourself and other people if COVID-19 is spreading in your community. This is especially important for people who are at higher risk of getting very sick.',
    },
  ],
};
const listss: ListModelll = {
  name: 'Open Prevention',
  items: [
    {
      name:
        'Stay home: Most people with COVID-19 have mild illness and are able to recover at home without medical care.',
    },
    {
      name:
        'Stay in touch with your doctor. Call before you get medical care. Be sure to get care if you have trouble breathing, or have any other emergency warning signs, or if you think it is an emergency.',
    },
    {
      name:
        'Stay away from others: As much as possible, you stay away from others. You should stay in a specific “sick room” if possible, and away from other people in your home. Use a separate bathroom, if available.',
    },
    {
      name:
        'If you are sick: You should wear a facemask, if available, when you are around other people (including before you enter a healthcare provider’s office).',
    },
    {
      name:
        'If you are caring for others: If the person who is sick is not able to wear a facemask (for example, because it causes trouble breathing), then as their caregiver, you should wear a facemask when in the same room with them. Visitors, other than caregivers, are not recommended.',
    },

    {
      name:
        'Do not share: Do not share dishes, drinking glasses, cups, eating utensils, towels, or bedding with other people in your home.',
    },
    { name: 'Cover your mouth and nose with a tissue when you cough or sneeze.' },
  ],
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
    padding: 16,
    minHeight: height,
  },
  title: {
    marginTop: 35,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
});

export default () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Prevention</Text>
        <Listt {...{ lists }} />

        <Text style={styles.title}>Symptoms</Text>
        <List {...{ list }} />
        <Text style={styles.title}>What To Do if You Are Sick</Text>
        <Listtt {...{ listss }} />
      </View>
    </ScrollView>
  );
};
