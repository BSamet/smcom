#Objet du projet :


L’objectif à terme du projet est de créer une application web permettant à des utilisateurs de pouvoir visualiser et d’interagir avec des machines à commande numérique de façon équivalente (en termes de fonctionnalités) au logiciel CWORK existant.

Une présentation du produit existant est disponible à l'adresse suivante :

https://www.smcom.com/produits . Le projet actuel portera plus particulièrement sur la partie

https://www.smcom.com/produits/cwork-prod et l'accès à la page de suivi état machines (timeline, calendrier, état, matrice).

Nous effectuerons bien entendu une présentation plus détaillée aux intervenants sous forme de présentation et QA.

Ci-dessous une présentation simplifiée sous forme de Story des principales attentes.

Dans un premier temps les priorités par ordre d’importance sont celles regroupées sous « Contrainte technique » suivi de «Utilisation générale (navigation) » enfin la partie métier en commençant par «Monitoring (PROD) » pourra servir de validation/démonstration de la solution.

Une attention particulière doit être portée à l’architecture du logiciel afin de permettre un développement incrémental et modulaire. La structure  stockage du code sera résumée dans un document afin de permettre d'intégrer de nouveau développeur facilement.

Concernant les technologies FrontEnd employées nous avons une préférence pour Angular pour son aspect structuré, mais nous restons ouverts à toutes autres propositions pertinentes.  L’interface devra être “responsive”, et répondre au standard design actuel. La mise en forme utilisera les CSS. Des tests unitaires pourront être réalisés pour les parties un peu complexe et utiliserons la structure fournis par le Angular.

Concernant les technologies BackEnd, actuellement les points d'accès REST sont développés en delphi et tournent dans des services windows. N’étant pas pleinement satisfait de cette technologie (gestion du https, des certificats, de l'authentification,  Codage/décodage json manuel à partir de string)  nous somme ouvert à toute proposition argumentée pour le langage/framework  backend (Javascript node js, .net c#, spring java, ….). Les contraintes majeures étant le déploiement facile sur serveur de production Windows, et la maintenabilité du code.

Une des contraintes principale est la non utilisation d’un PC de type LINUX pour la version production, nos clients étant sous Windows.

Pour la partie du logiciel serveur Web accueillant l'application, le choix est ouvert à partir du moment où il tourne sous Windows, s'installe facilement et supporte des mises à jour relatives aux failles de sécurité.