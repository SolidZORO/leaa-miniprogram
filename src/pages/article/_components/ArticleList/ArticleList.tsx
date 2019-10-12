import dayjs from 'dayjs';
import Taro, { useState, useEffect } from '@tarojs/taro';
import { View, Button, Text, Navigator } from '@tarojs/components';

import { ArticlesWithPaginationObject, ArticleArgs } from '@/dtos/article';

import { GET_ARTICLES } from '@/graphqls';
import { apolloClient } from '@/libs';

import style from './style.less';

export const ArticleList = () => {
  const [getArticlesVariables, setGetArticlesVariables] = useState<ArticleArgs>({
    page: 1,
    pageSize: 100,
    orderSort: 'DESC',
    orderBy: 'id',
  });
  const [getArticlesQuery, setGetArticlesQuery] = useState<{ articles: ArticlesWithPaginationObject }>();
  const [getArticlesLoading, setGetArticlesLoading] = useState<boolean>(false);

  useEffect(() => {
    setGetArticlesLoading(true);

    apolloClient
      .query({
        query: GET_ARTICLES,
        variables: getArticlesVariables,
        fetchPolicy: 'network-only',
      })
      .then(({ data, loading }) => {
        console.log('THEN', loading);

        setGetArticlesQuery(data);
      })
      .catch(error => {
        console.log('CATCH');

        console.error(error);
      })
      .finally(() => {
        setGetArticlesLoading(false);
      });
  }, [getArticlesVariables]);

  const onChangePage = () => {
    setGetArticlesVariables({ page: 1, pageSize: 30 });
  };

  return (
    <View className={style['wrapper']}>
      {getArticlesQuery &&
        getArticlesQuery.articles &&
        getArticlesQuery.articles.items &&
        getArticlesQuery.articles.items.map(article => (
          <Navigator
            key={article.id}
            url={`/pages/article/article-item?id=${article.id}`}
            className={style['item-link']}
          >
            <View className={style['item']}>
              <View className={style['item-title']}>
                <Text className={style['item-title-text']}>{article.title}</Text>
              </View>

              <View className={style['item-date']}>
                <Text className={style['item-date-text']}>
                  {dayjs(article.created_at).format('YYYY-MM-DD HH:mm:ss')}
                </Text>
              </View>
            </View>
          </Navigator>
        ))}

      {getArticlesQuery && getArticlesQuery.articles && (
        <Button onClick={onChangePage} loading={getArticlesLoading}>
          加载更多
        </Button>
      )}
    </View>
  );
};
