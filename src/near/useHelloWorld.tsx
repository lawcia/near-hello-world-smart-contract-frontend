import { useState, useContext, useEffect } from "react";

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
  const [contractBackup, setContractBackup] = useState<HelloWorldContract>();
  const context = useContext(NearContext);

  useEffect(() => {
    if (context === null) {
      return;
    }
    setIsAuthenticated(context.walletConnection.isSignedIn());
  }, [context]);

  const logout = () => {
    if (context !== null) {
      context.walletConnection.signOut();
    }
    window.location.replace(window.location.origin + window.location.pathname);
  };

  const login = () => {
    if (context === null) {
      logger("Could not login user");
      setIsError(true);
      return;
    }
    logger("Logging in user");
    context.walletConnection.requestSignIn(HELLO_WORLD_CONTRACT);
    try {
      initContract();
      setIsError(false);
    } catch {
      setIsError(true);
    }
  };

  const initContract = () => {
    if (context === null) {
      throw new Error("NEAR context is null");
    }

    let contract: HelloWorldContract;

    if (contractBackup === undefined) {
      contract = new Contract(
        context.walletConnection.account(),
        HELLO_WORLD_CONTRACT,
        {
          viewMethods: [],
          changeMethods: ["set_name", "delete", "get_name", "greet"],
        }
      ) as HelloWorldContract;

      setContractBackup(contract);
    } else {
      contract = contractBackup;
    }
    return contract;
  };

  const getGreeting = (name: string) => {
    logger("Get greeting");
    setIsLoading(true);
    setIsError(false);

    const contract = initContract();

    logger("Invoking contract");

    contract
      .set_name({ name })
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
