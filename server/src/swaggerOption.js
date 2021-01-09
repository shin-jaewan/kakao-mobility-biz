module.exports = {
  swaggerDefinition: {
    info: {
      title: 'KMB-Admin',
      description: 'Kakao-Mobility Biz tracker REST swagger'
    },
    basePath: "/api",
    contact: {
      email: "jaewanshin@kakao.com"
    },
    components: {
      res: {
        BadRequest: {
          description: '잘못된 요청.',
          schema: {
            $ref: '#/components/errorResult/Error'
          }
        },
        Forbidden: {
          description: '권한이 없음.',
          schema: {
            $ref: '#/components/errorResult/Error'
          }
        },
        NotFound: {
          description: '없는 리소스 요청.',
          schema: {
            $ref: '#/components/errorResult/Error'
          }
        }
      },
      errorResult: {
        Error: {
          type: 'object',
          properties: {
            errMsg: {
              type: 'string',
              description: '에러 메시지 전달.'
            }
          }
        }
      }
    },
    schemes: ["http"],
    definitions: {}
  },
  apis: ['src/routes/**/*.js'] // api 파일 위치들
};
