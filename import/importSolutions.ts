const targetOrigins = [
  // Legacy - alpha
  "https://script-lab-react-alpha.azurewebsites.net",
  // Legacy - beta
  "https://script-lab-react-beta.azurewebsites.net",
  // Legacy - Staging
  "https://script-lab-react-staging.azurewebsites.net",
  // Legacy - production
  "https://script-lab-react.azurewebsites.net",
  // Legacy - CDN
  "https://script-lab.azureedge.net",
];

/**
 * Copies over previous solutions from previous origins into the current editor
 */
export function importSolutions() {
  console.log("importSolutions");
  targetOrigins.forEach((targetOrigin) => {
    try {
      importSolutionsFromOrigin(targetOrigin);
    } catch (e) {
      console.error("importSolutions error", e);
    }
  });
}

// Origin key is used to store the fact that the solutions have been imported from a particular origin.

function getImportOriginKey(targetOrigin: string) {
  return `Import Done ${targetOrigin}`;
}

function hasImportedFromOrigin(targetOrigin: string) {
  return localStorage.getItem(getImportOriginKey(targetOrigin)) === "true";
}

function setImportedFromOriginDone(targetOrigin: string) {
  localStorage.setItem(getImportOriginKey(targetOrigin), "true");
}

function importSolutionsFromOrigin(targetOrigin: string) {
  if (hasImportedFromOrigin(targetOrigin)) {
    console.log(`import solutions from [${targetOrigin}] - done`);
    return;
  }

  console.log(`import solutions from [${targetOrigin}]`);

  // Origin of the iframe
  const iframeOrigin = targetOrigin;

  const source = iframeOrigin + "/import.html";
  const iframe = document.createElement("iframe");
  iframe.hidden = true;

  const onMessage = (event) => {
    console.log("onMessage", event);
    if (event.origin !== iframeOrigin) {
      // Useful for debugging, but too noisy for production
      // other messages are also sent.
      //console.log("Invalid origin", event.origin);
      return;
    }

    const { data } = event;
    const { id } = data;

    if (id === "solution-start") {
      console.log(`solution-start origin [${targetOrigin}]`);
    } else if (id === "solution") {
      const { key, value } = data;
      if (key === "solution#user-settings") {
        // ignore settings (not actually a solution)
        return;
      }

      // don't override an existing key
      if (localStorage.getItem(key) === null) {
        console.log(`solution origin [${targetOrigin}] - ${key} - import`);
        localStorage.setItem(key, value);
      } else {
        console.log(`solution origin [${targetOrigin}] - ${key} - already present`);
      }
    } else if (id === "solution-end") {
      console.log(`solution-end origin [${targetOrigin}]`);

      setImportedFromOriginDone(targetOrigin);

      // Stop listening
      window.removeEventListener("message", onMessage);
      // Should remove iframe, but it's convenient to check the keys.
      // document.body.removeChild(iframe);
    }
  };

  window.addEventListener("message", onMessage);
  iframe.onload = () => {
    console.log(`iframe loaded ${targetOrigin}`);
    iframe.contentWindow.postMessage({ id: "get-solutions" }, iframeOrigin);
  };
  iframe.src = source;
  document.body.appendChild(iframe);
}
