import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../theme";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync";
import { useEffect, useState } from "react";
import { intervalToDuration, isBefore } from "date-fns";
import { TimeSegment } from "../../components/TimeSegment";

type CountdownStatus = {
  isOverdue: boolean;
  distance: ReturnType<typeof intervalToDuration>;
};

const timestamp = Date.now() + 10 * 1000;

export default function CounterScreen() {
  const [status, setStatus] = useState<CountdownStatus>({
    isOverdue: false,
    distance: {},
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const isOverdue = isBefore(timestamp, Date.now());

      const distance = intervalToDuration(
        isOverdue
          ? { end: Date.now(), start: timestamp }
          : { start: Date.now(), end: timestamp },
      );

      setStatus({ isOverdue, distance });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const scheduleNotification = async () => {
    const result = await registerForPushNotificationsAsync();
    console.log("Permission: ", result);
    if (result === "granted") {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "I'm a notification from your app! 📨",
        },
        trigger: {
          seconds: 5,
        },
      });
    } else {
      Alert.alert(
        "Unable to schedule notification",
        "Enable the notifications permission for Expo Go in settings",
      );
    }
  };

  return (
    <View
      style={[
        styles.container,
        status.isOverdue ? styles.containerLate : undefined,
      ]}
    >
      {!status.isOverdue ? (
        <Text style={[styles.heading]}>Thing due in</Text>
      ) : (
        <Text style={[styles.heading, styles.whiteText]}>Thing overdue by</Text>
      )}

      <View style={styles.row}>
        <TimeSegment
          unit="Days"
          number={status.distance?.days ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
        <TimeSegment
          unit="Hours"
          number={status.distance?.hours ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
        <TimeSegment
          unit="Minutes"
          number={status.distance?.minutes ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
        <TimeSegment
          unit="Seconds"
          number={status.distance?.seconds ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={scheduleNotification}
        style={styles.button}
      >
        <Text style={styles.buttonText}>I've done the thing!</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Counter</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colorWhite,
  },
  button: {
    backgroundColor: theme.colorBlack,
    padding: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: theme.colorWhite,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  text: {
    fontSize: 24,
  },
  row: {
    flexDirection: "row",
    marginBottom: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    color: theme.colorBlack,
  },
  containerLate: {
    backgroundColor: theme.colorRed,
  },
  whiteText: {
    color: theme.colorWhite,
  },
});
