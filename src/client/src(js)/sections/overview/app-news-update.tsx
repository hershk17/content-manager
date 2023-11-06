import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Iconify from "../../components/iconify";
import Scrollbar from "../../components/scrollbar";
import { News } from "../../models/News";
import { fToNow } from "../../utils/format-time";

interface NewsItemProps {
  news: News;
}

// TODO: remove any and add proper types
export default function AppNewsUpdate({ title, subheader, list, ...other }: any) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {list.map((news: News) => (
            <NewsItem key={news.id} news={news} />
          ))}
        </Stack>
      </Scrollbar>

      <Divider sx={{ borderStyle: "dashed" }} />

      <Box sx={{ p: 2, textAlign: "right" }}>
        <Button size="small" color="inherit" endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}>
          View all
        </Button>
      </Box>
    </Card>
  );
}

AppNewsUpdate.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

function NewsItem({ news }: NewsItemProps) {
  const { image, title, description, postedAt } = news;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box component="img" alt={title} src={image} sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }} />

      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Link color="inherit" variant="subtitle2" underline="hover" noWrap>
          {title}
        </Link>

        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {description}
        </Typography>
      </Box>

      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: "text.secondary" }}>
        {fToNow(postedAt)}
      </Typography>
    </Stack>
  );
}

NewsItem.propTypes = {
  news: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    postedAt: PropTypes.instanceOf(Date),
  }),
};
