import React, { useState, useContext, useEffect } from "react";

import { Contract } from "near-api-js";

import { NearContext } from "./NearProvider";

import { logger } from "../utils/logger";

import { HELLO_WORLD_CONTRACT } from "./config";

interface HelloWorldContract extends Contract {
  get_name: () => Promise<any>;
  set_name: (args: { name: string }) => Promise<any>;
  delete: () => Promise<any>;
  greet: () => Promise<any>;
}

const useHelloWorld = () => {
  const [greeting, setGreeting] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [contract, setContract] = useState<HelloWorldContract>();
  const context = useContext(NearContext);

  useEffect(() => {
    if (context === null) {
      return;
    }
    setIsAuthenticated(context.walletConnection.isSignedIn());
  }, [context]);

  const logout = () => {
    if (context === null) return;
    context.walletConnection.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };

  const login = () => {
    if (context === null) {
      logger("Could not login user");
      setIsError(true);
      return;
    }
    logger("Logging in user");
    context.walletConnection?.requestSignIn(HELLO_WORLD_CONTRACT);
    (async () => {
      try {
        await initContract({ skipLogin: true });
        setIsError(false);
      } catch {
        setIsError(true);
      }
    })();
  };

  const initContract = async (options = { skipLogin: false }) => {
    if (context === null && options.skipLogin) {
      logger("User must login");
      setIsLoading(false);
      return;
    } else if (context === null) {
      login();
      return;
    }

    if (contract === undefined) {
      const localContract = (await new Contract(
        context.walletConnection.account(),
        HELLO_WORLD_CONTRACT,
        {
          viewMethods: [],
          changeMethods: ["set_name", "delete", "get_name", "greet"],
        }
      )) as unknown as HelloWorldContract;

      setContract(localContract);
    }
  };

  const getGreeting = async (name: string) => {
    logger("Get greeting");
    setIsLoading(true);
    setIsError(false);

    
    await initContract();
    
    logger("Invoking contract");
    contract?.set_name({ name })
      .then(() => {
        logger("Setting name");
        return contract.greet();
      })
      .then((result) => {
        logger("Getting greeting");
        setGreeting(result);
        setIsError(false);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
        logger("An error occured");
      });
  };

  const getUser = () => {
    if (context === null) return "";
    return context.walletConnection.getAccountId();
  };

  return {
    isAuthenticated,
    logout,
    login,
    getGreeting,
    greeting,
    isError,
    isLoading,
    getUser,
  };
};

export { useHelloWorld };
