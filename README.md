# Pay Assistant

## Built with

[react](https://reactjs.org) -JSX

[react-native](https://facebook.github.io/react-native/) -Mobile app development

[realm](https://realm.io) -Local database

[react-native-background-task](https://github.com/jamesisaac/react-native-background-task) -Background tasks

[react-native-image-picker](https://github.com/react-native-community/react-native-image-picker) -Choose the image for the bar code

[react-native-image-view](https://www.npmjs.com/package/react-native-image-view) -View for the bar code

[react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) -Icons for different features

[react-native-svg](https://github.com/react-native-community/react-native-svg) -SVG support

[react-native-chart-kit](https://www.npmjs.com/package/react-native-chart-kit) -Charts

[react-navigation](https://reactnavigation.org) -Navaigation between components

[react-native-gesture-handler](https://github.com/kmagiera/react-native-gesture-handler)

## Photos and fonts that are not mine

[Add bill button](https://www.freepik.com/free-icon/round-add-button_778713.htm)

[Pay all bills button](https://www.onlinewebfonts.com/icon/281585)

[Delete bill button](https://icons8.com/icon/10657/eliminar-propiedad)

[Pay bill button](https://www.freepik.com/free-icon/pay-per-click_754629.htm)

[Delete all bills button](https://www.flaticon.com/free-icon/delete_141966)

[Back button](https://www.freepik.com/free-icon/left-arrow_887187.htm)

[Logo - background image](https://www.pngsee.com/m/xbRwx_falling-money-png-money-rain-gif-transparent-png/)

[Font logo](https://www.dafont.com/third-rail.font?text=PA)

[Male avatar](https://www.sccpre.cat/show/iTRJwx_male-avatar-icons-png-free-and-downloads-clipart/)

[Female avatar](https://www.kisspng.com/png-female-avatar-cartoon-clip-art-user-avatar-882481/)

[Navigate to unpaid bills](https://iconscout.com/icon/product-bill-invoice-purchase-receipt-document-file)

[Navigate to paid bills](https://iconscout.com/icon/online-site-ecommerce-product-bill-paid-status)

## Functions that are not mine

Choose time function for Android from [docs](https://facebook.github.io/react-native/docs/timepickerandroid)
```
try {
  const {action, hour, minute} = await TimePickerAndroid.open({
    hour: 14,
    minute: 0,
    is24Hour: false, // Will display '2 PM'
  });
  if (action !== TimePickerAndroid.dismissedAction) {
    // Selected hour (0-23), minute (0-59)
  }
} catch ({code, message}) {
  console.warn('Cannot open time picker', message);
}
```


Choose date function for Android from [docs](https://facebook.github.io/react-native/docs/datepickerandroid.html)
```
try {
  const {action, year, month, day} = await DatePickerAndroid.open({
    // Use `new Date()` for current date.
    // May 25 2020. Month 0 is January.
    date: new Date(2020, 4, 25),
  });
  if (action !== DatePickerAndroid.dismissedAction) {
    // Selected year, month (0-11), day
  }
} catch ({code, message}) {
  console.warn('Cannot open date picker', message);
}
```


Choose date function for IOS from [docs](https://facebook.github.io/react-native/docs/datepickerios)
```
  setDate(newDate) {
    this.setState({chosenDate: newDate});
  }
```


Choose bar code photo from [docs](https://github.com/react-native-community/react-native-image-picker)
```
ImagePicker.showImagePicker(options, (response) => {
  console.log('Response = ', response);

  if (response.didCancel) {
    console.log('User cancelled image picker');
  } else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  } else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
  } else {
    const source = { uri: response.uri };

    // You can also display the image using data:
    // const source = { uri: 'data:image/jpeg;base64,' + response.data };

    this.setState({
      avatarSource: source,
    });
  }
});
```

## Run the app

Open the project in VS Code or Android Studio and run in the terminal
```
npm install
```

Then run ``` react-native-run-android ```
If you get an error, you can run ``` adb reverse tcp:8081 tcp:8081 ``` and then ``` react-native start```
After that reload the app and it is working.

