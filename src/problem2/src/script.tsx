import React from 'react';
import NumberFormat from 'react-number-format';
import {
  Grid,
  TextField,
  IconButton,
  Button,
  Typography,
  makeStyles,
} from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';

function AmountField(props: any) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
    />
  );
}

function OtpField(props: any) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      format="### ###"
      thousandSeparator
    />
  );
}

interface CustomTextFieldProps {
  label: string;
  callback: React.Dispatch<React.SetStateAction<string>>;
  inputComponent: undefined | any;
  value: string;
}

function CustomTextField(props: CustomTextFieldProps) {
  return (
    <TextField
      label={props.label}
      value={props.value}
      onChange={(e) => {
        props.callback(e.target.value);
      }}
      InputProps={
        props.inputComponent !== undefined
          ? {
              inputComponent: props.inputComponent,
            }
          : {}
      }
    />
  );
}

const useStyles = makeStyles((theme) => {
  return {
    form: {
      top: '50%',
      left: '50%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      position: 'fixed',
    },
  };
});

function App() {
  const [ethAddress, setEthAddress] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const classes = useStyles();

  const getBrowser = (): string => {
    // taken from https://developer.mozilla.org/en-US/docs/Web/API/Window/navigator
    var sBrowser: string,
      sUsrAg = navigator.userAgent;

    // The order matters here, and this may report false positives for unlisted browsers.

    if (sUsrAg.indexOf('Firefox') > -1) {
      sBrowser = 'firefox';
      // "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0"
    } else if (sUsrAg.indexOf('SamsungBrowser') > -1) {
      sBrowser = 'samsung';
      // "Mozilla/5.0 (Linux; Android 9; SAMSUNG SM-G955F Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/9.4 Chrome/67.0.3396.87 Mobile Safari/537.36
    } else if (sUsrAg.indexOf('Opera') > -1 || sUsrAg.indexOf('OPR') > -1) {
      sBrowser = 'opera';
      // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 OPR/57.0.3098.106"
    } else if (sUsrAg.indexOf('Trident') > -1) {
      sBrowser = 'ie';
      // "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; Zoom 3.6.0; wbx 1.0.0; rv:11.0) like Gecko"
    } else if (sUsrAg.indexOf('Edge') > -1) {
      sBrowser = 'edge';
      // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
    } else if (sUsrAg.indexOf('Chrome') > -1) {
      sBrowser = 'chromium';
      // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.181 Chrome/66.0.3359.181 Safari/537.36"
    } else if (sUsrAg.indexOf('Safari') > -1) {
      sBrowser = 'safari';
      // "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1 980x1306"
    } else {
      sBrowser = 'unknown';
    }

    return sBrowser;
  };

  const pasteFromClipboard = async (
    callback: React.Dispatch<React.SetStateAction<string>>
  ) => {
    !['firefox', 'uknown', 'opera'].includes(getBrowser()) &&
      (await navigator.clipboard
        .readText()
        .then((text) => {
          callback(text);
        })
        .catch(() => {
          console.log('Unable to read clipboard');
        }));
  };

  return (
    <div>
      <Grid container spacing={3} justify="center" className={classes.form}>
        <Typography variant="h5" component="h4">
          SENDING CRYPTO!!!!!
        </Typography>
        <Grid item></Grid>
        <Grid item container direction="row" justify="center" alignItems="flex-end">
          <Grid item>
            <CustomTextField
              label="ETH Address"
              callback={setEthAddress}
              inputComponent={undefined}
              value={ethAddress}
            />
          </Grid>
          <Grid item>
            <IconButton onClick={async () => pasteFromClipboard(setEthAddress)}>
              <AssignmentIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item container direction="row" justify="center" alignItems="flex-end">
          <Grid item>
            <CustomTextField
              label="Amount"
              callback={setAmount}
              inputComponent={AmountField}
              value={amount}
            />
          </Grid>
          <Grid item>
            <IconButton onClick={() => pasteFromClipboard(setAmount)}>
              <AssignmentIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item container direction="row" justify="center" alignItems="flex-end">
          <Grid item>
            <TextField
              label="One-time passcode"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
              }}
              InputProps={{
                inputComponent: OtpField,
              }}
            />
          </Grid>
          <Grid item>
            <IconButton onClick={() => pasteFromClipboard(setOtp)}>
              <AssignmentIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item>
          <Button>send tokens</Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
