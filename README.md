# Pen and Paper overlay for OBS
Small overlay for displaying Pen and Paper character info with OBS.

If you encounter any errors or miss any features, please open an issue.


## How to include
### Overlay
* Add a browser source in OBS
* Check mark for local file
* Browse to overlay.html

### Settings
* Go to Docks -> Custom Browser Docks...
* Give a name of your choice as name
* Set `http:\\absolute\<<PATH_TO_DIRECTORY>>\settings.html` as URL

## How to configure
* Change attributes of your character and UI colors in the settings of the overlay
* Possible additional icons available on https://fontawesome.com/search?m=free&s=solid
* Additional icons need to be added in `overlay.html` as additional options like this:

  ```
  <option value="<i class='fa-solid fa-hat-wizard'></i>">
      &#xf6e8
  </option>
  ```

## Planned features
* More character icon options

## Known errors
* The download of the configuration does not work at the moment

## Troubleshooting
* Check if OBS has the newest version
