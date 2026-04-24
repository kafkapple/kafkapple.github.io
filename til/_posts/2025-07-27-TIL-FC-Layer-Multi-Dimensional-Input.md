---
layout: post
title: "TIL FC Layer Multi Dimensional Input"
date: 2025-07-27
categories: [til]
tags: [TIL]
---

# 📄 FC_Layer_Multi_Dimensional_Input

FC(Dense) 레이어는 다차원 텐서 입력을 직접 처리하지 않으며, 이는 파라미터 폭증 문제와 프레임워크 설계 원칙에 기인

### 1. FC 레이어의 입력 제약

#### 1.1 입력 형식 제한

- 1차원 벡터 입력: FC 레이어는 기본적으로 1차원 벡터 또는 2차원([batch, features]) 형태의 입력을 처리.

- 자동 Flatten 또는 명시적 Flatten: 다차원 텐서 입력 시 내부적으로 Flatten되거나 오류 발생.

### 2. 다차원 입력의 비효율성

#### 2.1 파라미터 폭증 문제

- 내부적 Flatten 처리: 다차원 텐서 입력 시 모든 요소를 독립적인 입력 뉴런으로 간주하여 Flatten.

- 기하급수적 파라미터 증가: 입력 차원 수에 따라 파라미터 수가 폭발적으로 증가 (예: 8x8x128 입력 -> 2백만 개 이상 파라미터).

- 오버피팅 및 메모리 문제: 과도한 파라미터로 인한 오버피팅 및 학습/추론 시 메모리 부족 발생.

### 3. 다차원 데이터 처리 전략

#### 3.1 차원 축소 및 특징 요약

- Convolutional/Pooling 레이어 활용: 공간 구조 유지를 위한 컨볼루션 및 풀링 레이어 사용.

- GlobalAveragePooling: 다차원 텐서의 차원을 축소하고 특징을 요약하는 기법.

- Flatten 단계 필수: FC 레이어 연결 전 Flatten 등의 차원 변환 단계 필수.
