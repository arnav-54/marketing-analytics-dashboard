CREATE DATABASE IF NOT EXISTS marketing_analytics;
USE marketing_analytics;

DROP TABLE IF EXISTS campaigns;
DROP TABLE IF EXISTS monthly_performance;
DROP TABLE IF EXISTS channels;

create table monthly_performance (
    id int auto_increment primary key,
    month varchar(7),
    total_spend decimal(12,2),
    total_revenue decimal(12,2),
    total_conversions int,
    roas decimal(8,2)
);
CREATE TABLE campaigns (
    id int AUTO_INCREMENT primary key,
    channel_name varchar(50),
    campaign_name varchar(100),
    total_spend decimal(12,2),
    total_revenue decimal(12,2),
    conversions int,
    roas decimal(8,2)
);
create table channels (
    id int auto_increment primary key,
    name varchar(50),
    total_spend decimal(12,2),
    total_revenue decimal(12,2),
    total_conversions int,
    roas decimal(8,2),
    cpa decimal(10,2),
    cpc decimal(10,2)


)