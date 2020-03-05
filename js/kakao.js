String templateId = "332858";

Map<String, String> templateArgs = new HashMap<String, String>();
templateArgs.put("template_arg1", "value1");
templateArgs.put("template_arg2", "value2");

Map<String, String> serverCallbackArgs = new HashMap<String, String>();
serverCallbackArgs.put("user_id", "${current_user_id}");
serverCallbackArgs.put("product_id", "${shared_product_id}");

KakaoLinkService.getInstance().sendCustom(this, templateId, templateArgs, serverCallbackArgs, new ResponseCallback<KakaoLinkResponse>() {
            @Override
            public void onFailure(ErrorResult errorResult) {
                Logger.e(errorResult.toString());
            }

            @Override
            public void onSuccess(KakaoLinkResponse result) {
              // 템플릿 밸리데이션과 쿼터 체크가 성공적으로 끝남. 톡에서 정상적으로 보내졌는지 보장은 할 수 없다. 전송 성공 유무는 서버콜백 기능을 이용하여야 한다.
            }
        })