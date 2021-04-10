1. Имя каждого теста должно состоять из трёх частей
   1. Что именно тестируется?
   1. При каких условиях и сценарии?
   1. Какой ожидается результат?

1. Структурируйте тесты согласно паттерну AAA
   1. Arrange: весь код, который приводит систему в состояние согласно тестовому сценарию.
   1. Act: исполнение кода в рамках теста.
   1. Assert: убеждаемся, что полученное значение удовлетворяет ожиданиям.
    
1. Описывайте ожидания на языке продукта: констатируйте в стиле BDD.
   1. Программирование тестов в декларативном стиле позволяет пользователю сразу понять суть, не тратя ни одного цикла мозгового процессора.
    
1. Придерживайтесь тестирования по методу «чёрного ящика»: тестируйте только публичные методы

1. Выбирайте правильные имитированные реализации: избегайте фальшивых объектов в пользу заглушек и шпионов
   
1. Если при любом, даже самом мелком изменении, которое сделал разработчик, прогонять все тесты, включая те, что выполняют десятки запросов к базе данных, то рабочий процесс очень сильно замедлится, а разработчики будут стараться избегать тестирования.

1. Избегайте глобальных тестовых стендов и начальных данных, добавляйте данные в каждый тест по отдельности
   Несколько тестов провалены, развёртывание прервано, теперь команда потратит драгоценное время, у нас баг? Давайте искать, блин, кажется, два теста меняли одни и те же начальные данные.
   
1. Не применяйте «foo», используйте реалистичные входные данные


Тестируйте промежуточное ПО изолированно
Node-chaos - может генерировать все виды неприятностей, связанных с Node.js, так что можете протестировать устойчивость своего приложения в условиях хаоса.
Sonarcube - Оценивайте и рефакторьте с помощью инструментов статического анализа

Тестирование фронтенда

1. Отделяйте UI от функциональности