# The Yeoman Orbinoïd Generator

This markdown file is a utility I use to quickly resume work on my last task, on this repo.

Change this for yoru own needs when you fork this repo.

# To (re-init) work

* create an empty github.com/gitlab.com repo,
* git clone it into local `~/generator-orbinoid` folder (change that folder path to wherever you want on your machine), and launch atom in this folder `atom ~/generator-orbinoid`
* Add this `README.md`
* then run copy/paster :

```bash

git config --global commit.gpgsign true
git config --global user.name "Jean-Baptiste-Lasselle"
git config --global user.email jean.baptiste.lasselle.pegasus@gmail.com
git config --global user.signingkey 7B19A8E1574C2883

git config --global --list

# will re-define the default identity in use
# https://docstore.mik.ua/orelly/networking_2ndEd/ssh/ch06_04.htm
ssh-add ~/.ssh.perso.backed/id_rsa

export GIT_SSH_COMMAND='ssh -i ~/.ssh.perso.backed/id_rsa'
ssh -Ti ~/.ssh.perso.backed/id_rsa git@github.com


export LOCAL_WORKSPACE=~/generator-orbinoid
cd ${LOCAL_WORKSPACE}
atom .
export FEATURE_ALIAS="project_init"
export COMMIT_MESSAGE="feat.(${FEATURE_ALIAS}): adding [RESUME_WORK.md]"
git add --all && git commit -m "${COMMIT_MESSAGE}" && git push -u origin HEAD
# git add --all && git commit --amend -m "${COMMIT_MESSAGE}" && git push -ff -u origin HEAD
git flow init --defaults
git push -u origin --all

```

# To resume work

* copy/paster :

```bash

git config --global commit.gpgsign true
git config --global user.name "Jean-Baptiste-Lasselle"
git config --global user.email jean.baptiste.lasselle.pegasus@gmail.com
git config --global user.signingkey 7B19A8E1574C2883

git config --global --list

# will re-define the default identity in use
# https://docstore.mik.ua/orelly/networking_2ndEd/ssh/ch06_04.htm
ssh-add ~/.ssh.perso.backed/id_rsa

export GIT_SSH_COMMAND='ssh -i ~/.ssh.perso.backed/id_rsa'
ssh -Ti ~/.ssh.perso.backed/id_rsa git@github.com


export LOCAL_WORKSPACE=~/generator-orbinoid
cd ${LOCAL_WORKSPACE}
atom .
export FEATURE_ALIAS="somefeatureimworkingon"
export COMMIT_MESSAGE="feat.(${FEATURE_ALIAS}): what you'll be working on in a few words here "
# git flow init --defaults
# git flow feature start "${FEATURE_ALIAS}"
# git add --all && git commit -m "${COMMIT_MESSAGE}" && git push -u origin HEAD
# git add --all && git commit --amend -m "${COMMIT_MESSAGE}" && git push -ff -u origin HEAD

```
