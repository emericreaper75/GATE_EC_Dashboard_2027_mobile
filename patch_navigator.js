const fs = require('fs');

let content = fs.readFileSync('src/navigation/MainNavigator.js', 'utf8');

// Replace tabs
content = content.replace(/<Tab\.Screen\s+name="PYQStack"[\s\S]*?<\/Tab\.Screen>/, '');
content = content.replace(/<Tab\.Screen\s+name="MoreStack"[\s\S]*?<\/Tab\.Screen>/, `
      <Tab.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog-outline" color={color} size={size} />
          ),
        }}
      />
`);

content = content.replace(/function HomeStack\(\) {[\s\S]*?return \([\s\S]*?<Stack\.Navigator screenOptions={STACK_OPTS}>[\s\S]*?<Stack\.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'GATE EC 2027' }} \/>[\s\S]*?<\/Stack\.Navigator>\)[\s\S]*?}/, `function HomeStack() {
  return (
    <Stack.Navigator screenOptions={STACK_OPTS}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'GATE EC 2027' }} />
      <Stack.Screen name="ErrorJournal" component={ErrorJournalScreen} options={{ title: 'Error Journal' }} />
      <Stack.Screen name="PYQLog" component={PYQLogScreen} options={{ title: 'PYQ Log' }} />
      <Stack.Screen name="FormulaSheet" component={FormulaSheetScreen} options={{ title: 'Formula Sheets' }} />
      <Stack.Screen name="MockAnalyzer" component={MockAnalyzerScreen} options={{ title: 'Mock Analyzer' }} />
      <Stack.Screen name="WeeklyReview" component={WeeklyReviewScreen} options={{ title: 'Weekly Review' }} />
      <Stack.Screen name="StrategyPlan" component={StrategyPlanScreen} options={{ title: 'Strategy Plan' }} />
    </Stack.Navigator>
  );
}`);

content = content.replace(/function MoreStack\(\) {[\s\S]*?return \([\s\S]*?<\/Stack\.Navigator>\);\s*}/, `function SettingsStack() {
  return (
    <Stack.Navigator screenOptions={STACK_OPTS}>
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
    </Stack.Navigator>
  );
}`);

content = content.replace(/function PYQStack\(\) {[\s\S]*?return \([\s\S]*?<\/Stack\.Navigator>\);\s*}/, '');

fs.writeFileSync('src/navigation/MainNavigator.js', content);
