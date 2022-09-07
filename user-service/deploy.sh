while true; do
  read -p $'You are deploying to \e[31mProduction\e[0m. Continue? [Y/n] ' yn
  case $yn in
    [Y]* ) break;;
    [Nn]* ) exit;;
    * ) echo "Please answer [Y/n].";;
  esac
done
firebase use peerprep-userser
firebase functions:config:unset env
firebase functions:config:set env="$(cat .env.json)"
firebase deploy --only firestore:indexes,firestore:rules