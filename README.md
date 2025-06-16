# ENAA ITsupport App

## 📌 Description du projet

**ENAA ITsupport App** est un système de gestion des ressources informatiques conçu pour faciliter le suivi et la gestion des équipements informatiques au sein d’une organisation. L'application permet également de gérer les pannes, les tickets de support et de générer des rapports et statistiques pour une meilleure prise de décision.

Ce projet a été réalisé dans le cadre de la formation "Développeur Web et Web Mobile" et vise à mettre en pratique les compétences de développement full-stack Java / Angular.

---

## 🎯 Objectifs

- Suivre l’état et l’utilisation des équipements informatiques.
- Gérer efficacement les pannes signalées.
- Traiter les demandes de support via un système de tickets.
- Générer des rapports et statistiques pour analyse.

---

## 👤 Rôles et User Stories

### 🔧 Gestion des Équipements Informatiques
- En tant qu’administrateur IT, je peux **ajouter, modifier, supprimer** des équipements.
- En tant qu’administrateur IT, je peux **visualiser la liste** des équipements avec leur état.

### ⚠️ Gestion et Suivi des Pannes
- En tant qu’administrateur IT, je peux **gérer (ajouter, modifier, supprimer)** les pannes.
- Je peux aussi consulter **l’historique des pannes** de chaque équipement.

### 🛠️ Gestion des Tickets de Support
- En tant qu’utilisateur, je peux **créer un ticket** pour signaler une panne.
- En tant qu’administrateur IT, je peux **assigner un ticket** à un technicien.
- En tant que technicien, je peux **voir les tickets qui me sont attribués**.
- En tant qu’utilisateur, je peux **suivre l’état** de mon ticket.

### 📊 Bonus : Rapports et Statistiques
- Notifications pour tickets en attente.
- Statistiques des pannes pour identifier les équipements problématiques.
- Rapports sur l’état des équipements et les performances du service support.

---

## ⚙️ Fonctionnement

- L’**Historique des Pannes** enregistre chaque problème lié à un équipement.
- Les **Tickets de Support** sont liés aux utilisateurs et attribués aux techniciens.
- Le suivi des tickets permet d’évaluer la performance des techniciens et la satisfaction des utilisateurs.

---

## 🛠️ Technologies Utilisées

| Côté | Technologies |
|------|--------------|
| Backend | Spring Boot, Spring Data JPA, Spring Security |
| Frontend | Angular 16+ |
| Base de Données | PostgreSQL / MySQL |
| Tests Unitaires | JUnit |
| Conteneurisation | Docker |
| Documentation API | Swagger |


---

## 🖇️ Diagrammes UML

### 1. 📌 Diagramme de Cas d'Utilisation
Permet d’illustrer les différentes interactions entre les utilisateurs (Admin, Utilisateur, Technicien) et le système.

![image](https://github.com/user-attachments/assets/b4289904-013e-416e-a4f2-2bb1fec433d4)


---

### 2. 🧩 Diagramme de Classes
Représente les entités principales du système, leurs attributs, méthodes et relations (équipements, pannes, tickets, utilisateurs...).

![image](https://github.com/user-attachments/assets/bd635f15-ca1c-4c81-bc38-20e1386787ae)

---

### 3. 🔄 Diagramme de Séquence
Décrit le déroulement d’un scénario spécifique, comme la création et le traitement d’un ticket de support.

#### 3.1 
![image](https://github.com/user-attachments/assets/1b7d798c-f1f8-41bd-a791-57475c949416)

#### 3.2
![image](https://github.com/user-attachments/assets/4c5dfbc0-22fa-4dee-b9d2-be5f6221c79f)


#### 3.3
![image](https://github.com/user-attachments/assets/23f1d538-4b66-4685-a745-70987e48785a)


---

## ✅ Critères de performance

- Fonctionnalités implémentées et conformes aux user stories
- Gestion des exceptions
- Tests des API avec Postman
- Tests unitaires (JUnit)
- Respect des délais de livraison
